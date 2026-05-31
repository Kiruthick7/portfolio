import time
import pytest
from pydantic import BaseModel, Field, ValidationError
from typing import List, Literal

# ── 1. SCHEMA DEFINITIONS (The Pydantic Guardrail Layer) ──
class SafetyAction(BaseModel):
    action_id: str
    title: str
    priority: Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    instructions: List[str]
    assigned_zones: List[str]
    deterministic_fallback: bool = False

# Mock Deterministic Rules Database
DETERMINISTIC_RULES = {
    "RAIN": SafetyAction(
        action_id="fallback_rain_01",
        title="Emergency Weather Protocol",
        priority="HIGH",
        instructions=["Deploy stadium roof tarps", "Open concourse shelter gates", "Broadcast weather delay announcement"],
        assigned_zones=["Zone-A", "Zone-B", "Zone-C"],
        deterministic_fallback=True
    ),
    "OVERCROWD": SafetyAction(
        action_id="fallback_crowd_01",
        title="Crowd Redistribution Protocol",
        priority="CRITICAL",
        instructions=["Redirect turnstile entrances", "Deploy security barriers", "Open emergency exit gates"],
        assigned_zones=["Zone-Z1"],
        deterministic_fallback=True
    )
}

# ── 2. CORE BACKEND ROUTING LOGIC (With Telemetry & Fail-Safe Watchdog) ──
class TelemetryWatchdog:
    def __init__(self, latency_sla_ms: float = 1200.0):
        self.latency_sla_ms = latency_sla_ms

    def execute_incident_routing(self, incident_type: str, mock_llm_callable, *args, **kwargs) -> SafetyAction:
        start_time = time.perf_counter()
        
        try:
            # Try primary path: Execute inference
            raw_llm_output = mock_llm_callable(*args, **kwargs)
            
            # Enforce Pydantic validation check
            validated_action = SafetyAction.model_validate_json(raw_llm_output)
            
            # Execution SLA Watchdog check
            execution_latency_ms = (time.perf_counter() - start_time) * 1000.0
            if execution_latency_ms > self.latency_sla_ms:
                # SLA Breached -> Trigger deterministic fallback
                fallback_action = DETERMINISTIC_RULES.get(incident_type)
                fallback_action.instructions.append(f"SLA Breached ({execution_latency_ms:.1f}ms). Watchdog fallback active.")
                return fallback_action
                
            return validated_action
            
        except (ValidationError, Exception) as e:
            # Validation failed or API down -> Trigger deterministic fallback
            fallback_action = DETERMINISTIC_RULES.get(incident_type)
            fallback_action.instructions.append(f"Primary path failure mitigated: {str(e)}")
            return fallback_action


# ── 3. AUTOMATED PYTEST SUITE (Technical Proof Assets) ──

def test_successful_llm_path():
    """Test when LLaMA 3 inference is fast and returns perfectly formatted Pydantic-compliant JSON."""
    watchdog = TelemetryWatchdog(latency_sla_ms=1200.0)
    
    # Mocking a valid, sub-1200ms LLM recommendation payload
    def mock_fast_llm():
        time.sleep(0.1) # 100ms latency
        return '{"action_id": "llm_rain_09", "title": "AI Weather Advice", "priority": "HIGH", "instructions": ["Cover pitch", "Advise fans"], "assigned_zones": ["Zone-A"], "deterministic_fallback": false}'
        
    result = watchdog.execute_incident_routing("RAIN", mock_fast_llm)
    
    assert result.deterministic_fallback is False
    assert result.action_id == "llm_rain_09"
    assert "AI Weather Advice" in result.title


def test_watchdog_sla_latency_fallback():
    """Test that the Telemetry Watchdog catches slow AI API latencies (>1.2s) and triggers the fallback rules engine."""
    watchdog = TelemetryWatchdog(latency_sla_ms=1200.0)
    
    # Mocking a slow LLM recommendation payload (1.5 seconds latency)
    def mock_slow_llm():
        time.sleep(1.3) # Spikes past 1.2s SLA
        return '{"action_id": "llm_rain_09", "title": "AI Weather Advice", "priority": "HIGH", "instructions": ["Cover pitch"], "assigned_zones": ["Zone-A"], "deterministic_fallback": false}'
        
    result = watchdog.execute_incident_routing("RAIN", mock_slow_llm)
    
    # Watchdog should enforce fallback and flag the telemetry
    assert result.deterministic_fallback is True
    assert result.action_id == "fallback_rain_01"
    assert any("SLA Breached" in inst for inst in result.instructions)


def test_pydantic_schema_validation_drift():
    """Test that a malformed or non-deterministic JSON payload from LLaMA 3 is intercepted and recovered by the rules engine."""
    watchdog = TelemetryWatchdog(latency_sla_ms=1200.0)
    
    # Mocking an invalid JSON payload (missing required keys and mismatched priority types)
    def mock_malformed_llm():
        return '{"action_id": "invalid_09", "title": "Malformed", "priority": "UNRECOGNIZED_LEVEL"}' # invalid priority
        
    result = watchdog.execute_incident_routing("RAIN", mock_malformed_llm)
    
    # Should catch ValidationError and route to deterministic fallback
    assert result.deterministic_fallback is True
    assert result.action_id == "fallback_rain_01"
    assert any("Primary path failure mitigated" in inst for inst in result.instructions)


def test_stateless_payload_size_limit():
    """Ensure the API response payload is lightweight (<4KB) to survive crowded venue cellular congestion."""
    import sys
    
    # Get size of our safety actions
    action = DETERMINISTIC_RULES["RAIN"]
    serialized = action.model_dump_json()
    payload_bytes = sys.getsizeof(serialized)
    
    # In crowded venues, payloads should be highly compressed
    assert payload_bytes < 4096 # Payload must be under 4KB limit
