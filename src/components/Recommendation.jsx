import React, { useState } from "react";

const Recommendation = () => {
  const [activity, setActivity] = useState("low");
  const [foodType, setFoodType] = useState("balanced");
  const [advice, setAdvice] = useState("");

  const handleRecommend = () => {
    let tips = "";
    if (activity === "low") tips += "⚡ Try to walk at least 5,000–7,000 steps daily. ";
    else if (activity === "medium") tips += "💪 Keep consistency with light strength training. ";
    else tips += "🔥 Excellent! Maintain good hydration and recovery. ";

    if (foodType === "junk") tips += "🍔 Reduce junk food; focus on whole grains and lean proteins.";
    else if (foodType === "veg") tips += "🥗 Ensure enough protein (lentils, tofu, paneer).";
    else tips += "🍱 Balanced diet — mix carbs, protein, and healthy fats.";

    setAdvice(tips);
  };

  return (
    <div className="container text-center mt-4">
      <h2 className="text-info mb-3">💡 AI Health Recommendations</h2>
      <div className="recommendation-card mx-auto p-3">
        <div className="mb-2 text-start">
          <label className="form-label fw-bold">Your Activity Level</label>
          <select className="form-select" value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="low">Low (Less than 3,000 steps/day)</option>
            <option value="medium">Medium (3,000 - 8,000 steps/day)</option>
            <option value="high">High (8,000+ steps/day)</option>
          </select>
        </div>

        <div className="mb-2 text-start">
          <label className="form-label fw-bold">Your Food Type</label>
          <select className="form-select" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
            <option value="balanced">Balanced</option>
            <option value="veg">Vegetarian</option>
            <option value="junk">Mostly Junk</option>
          </select>
        </div>

        <button className="btn btn-primary mt-2" onClick={handleRecommend}>Get Recommendation</button>

        {advice && <div className="advice-box mt-3">{advice}</div>}
      </div>
    </div>
  );
};

export default Recommendation;
