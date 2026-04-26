import { useState } from "react";

export default function FuelCostCalculator() {
  const [distUnit, setDistUnit] = useState<"miles" | "km">("miles");
  const [effUnit, setEffUnit] = useState<"mpg" | "l100km">("mpg");
  const [priceUnit, setPriceUnit] = useState<"gallon" | "liter">("gallon");
  const [dist, setDist] = useState("");
  const [eff, setEff] = useState("");
  const [price, setPrice] = useState("");
  const [dist2, setDist2] = useState("");
  const [eff2, setEff2] = useState("");

  function calcCost(distVal: string, effVal: string, priceVal: string) {
    const d = parseFloat(distVal);
    const e = parseFloat(effVal);
    const p = parseFloat(priceVal);
    if (!d || !e || !p || e === 0) return null;

    // Normalize to km and liters
    const distKm = distUnit === "miles" ? d * 1.60934 : d;
    let fuelL: number;
    if (effUnit === "mpg") {
      const mpg = e;
      const kpl = mpg * 0.425144;
      fuelL = distKm / kpl;
    } else {
      fuelL = (distKm / 100) * e;
    }
    const pricePerL = priceUnit === "gallon" ? p / 3.78541 : p;
    const totalCost = fuelL * pricePerL;
    return { fuelL, totalCost };
  }

  const r1 = calcCost(dist, eff, price);
  const r2 = dist2 && eff2 ? calcCost(dist2, eff2, price) : null;

  const inputStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", outline: "none", flex: 1 };
  const selectStyle: React.CSSProperties = { ...inputStyle, flex: "none" };
  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };

  const faqs: FAQItem[] = [
    {
      question: "How does the Fuel Cost Calculator determine the total cost?",
      answer: "The calculator uses your input for distance, fuel efficiency, and fuel price to estimate the total fuel volume needed and then multiplies it by the price per unit to calculate the total cost for your trip.",
    },
    {
      question: "Can I compare different vehicles with this tool?",
      answer: "Yes, the Fuel Cost Calculator allows you to input details for two separate vehicles, enabling a side-by-side comparison of their estimated fuel costs for the same trip.",
    },
    {
      question: "What fuel efficiency units does the calculator support?",
      answer: "The tool supports common fuel efficiency units such as Miles Per Gallon (MPG) and Liters per 100 Kilometers (L/100km), allowing you to switch between them as needed.",
    },
    {
      question: "Is it possible to use different distance units?",
      answer: "Absolutely. You can choose between miles and kilometers for your distance measurements, and the calculator will perform the necessary conversions internally.",
    },
    {
      question: "Why is my calculated fuel cost different from the actual cost at the pump?",
      answer: "The calculator provides an estimate based on the data you provide. Actual costs can vary due to factors like driving style, traffic conditions, vehicle load, and slight fluctuations in fuel prices.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        {/* Units */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label style={labelStyle}>Distance unit</label>
            <div className="flex gap-2">
              {(["miles","km"] as const).map(u => (
                <button key={u} onClick={() => setDistUnit(u)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", border: "2px solid", borderColor: distUnit === u ? "#1B6B45" : "#E8E6DE", background: distUnit === u ? "#1B6B45" : "white", color: distUnit === u ? "white" : "#4B5563", cursor: "pointer" }}>{u}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Efficiency unit</label>
            <div className="flex gap-2">
              {(["mpg","l100km"] as const).map(u => (
                <button key={u} onClick={() => setEffUnit(u)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", border: "2px solid", borderColor: effUnit === u ? "#1B6B45" : "#E8E6DE", background: effUnit === u ? "#1B6B45" : "white", color: effUnit === u ? "white" : "#4B5563", cursor: "pointer" }}>{u}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Fuel price per</label>
            <div className="flex gap-2">
              {(["gallon","liter"] as const).map(u => (
                <button key={u} onClick={() => setPriceUnit(u)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", border: "2px solid", borderColor: priceUnit === u ? "#1B6B45" : "#E8E6DE", background: priceUnit === u ? "#1B6B45" : "white", color: priceUnit === u ? "white" : "#4B5563", cursor: "pointer" }}>{u}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Shared fuel price */}
        <div>
          <label style={labelStyle}>Fuel price (per {priceUnit})</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder={priceUnit === "gallon" ? "e.g. 3.50" : "e.g. 1.60"} />
        </div>

        {/* Vehicle 1 */}
        <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>Vehicle 1</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Distance ({distUnit})</label>
              <input type="number" value={dist} onChange={e => setDist(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="e.g. 300" />
            </div>
            <div>
              <label style={labelStyle}>Fuel efficiency ({effUnit === "mpg" ? "MPG" : "L/100km"})</label>
              <input type="number" value={eff} onChange={e => setEff(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder={effUnit === "mpg" ? "e.g. 30" : "e.g. 7"} />
            </div>
          </div>
          {r1 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div style={{ background: "#E8F5EE", borderRadius: "0.75rem", padding: "0.875rem", border: "1.5px solid #C6E6D4" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1B6B45" }}>${r1.totalCost.toFixed(2)}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280" }}>Total cost</div>
              </div>
              <div style={{ background: "#FFF9E0", borderRadius: "0.75rem", padding: "0.875rem", border: "1.5px solid #FFE234" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#B8860B" }}>{r1.fuelL.toFixed(2)}L</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280" }}>Fuel needed</div>
              </div>
            </div>
          )}
        </div>

        {/* Vehicle 2 */}
        <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>Vehicle 2 (comparison)</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Distance ({distUnit})</label>
              <input type="number" value={dist2} onChange={e => setDist2(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="Same or different distance" />
            </div>
            <div>
              <label style={labelStyle}>Fuel efficiency ({effUnit === "mpg" ? "MPG" : "L/100km"})</label>
              <input type="number" value={eff2} onChange={e => setEff2(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="e.g. 45" />
            </div>
          </div>
          {r2 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div style={{ background: "#E8F5EE", borderRadius: "0.75rem", padding: "0.875rem", border: "1.5px solid #C6E6D4" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1B6B45" }}>${r2.totalCost.toFixed(2)}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280" }}>Total cost</div>
              </div>
              <div style={{ background: "#FFF9E0", borderRadius: "0.75rem", padding: "0.875rem", border: "1.5px solid #FFE234" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#B8860B" }}>{r2.fuelL.toFixed(2)}L</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280" }}>Fuel needed</div>
              </div>
            </div>
          )}
          {r1 && r2 && (
            <div style={{ marginTop: "1rem", background: r1.totalCost <= r2.totalCost ? "#E8F5EE" : "#FFF0F0", borderRadius: "0.75rem", padding: "0.875rem 1rem", border: "1.5px solid #E8E6DE" }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", margin: 0 }}>
                {r1.totalCost <= r2.totalCost ? "✓ Vehicle 1 saves" : "✓ Vehicle 2 saves"} <span style={{ color: "#1B6B45" }}>${Math.abs(r1.totalCost - r2.totalCost).toFixed(2)}</span> on this trip.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}