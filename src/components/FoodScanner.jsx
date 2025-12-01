import React, { useState, useEffect } from "react";
import foodData from "../data/foodDataset.json";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const FoodScanner = () => {
  const [foodName, setFoodName] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [advice, setAdvice] = useState("");
  const [detected, setDetected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Load favorites & history
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const hist = JSON.parse(localStorage.getItem("history")) || [];
    setFavorites(favs);
    setHistory(hist);
  }, []);

  // Save favorites
  const saveFavorites = (item) => {
    const updated = [item, ...favorites.filter(f => f.name !== item.name)];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Remove a favorite
  const removeFavorite = (name) => {
    const updated = favorites.filter(f => f.name !== name);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Save search history
  const saveHistory = (item) => {
    const updated = [item.name, ...history.filter(h => h !== item.name)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  // Detect food
  const detectFood = (name) => {
    const item = foodData.find(f => f.name.toLowerCase() === name.toLowerCase());
    if (item) {
      setNutrition({
        calories: item.calories,
        carbs: item.carbs,
        protein: item.protein,
        fat: item.fat,
      });
      setAdvice(item.advice);
      setDetected(true);
      setSuggestions([]);
      saveHistory(item);
    } else {
      alert("Food not found in dataset!");
    }
  };

  const handleDetect = () => {
    if (!foodName.trim()) {
      alert("Please enter a food name.");
      return;
    }

    const match = foodData.find(f =>
      f.name.toLowerCase() === foodName.trim().toLowerCase()
    );

    if (match) {
      detectFood(foodName);
    } else {
      const matched = foodData
        .filter(f => f.name.toLowerCase().includes(foodName.trim().toLowerCase()))
        .map(f => f.name)
        .slice(0, 5);
      setSuggestions(matched);
      setNutrition(null);
      setAdvice("Try selecting one of the suggested foods.");
      setDetected(false);
    }
  };

  const handleSelectSuggestion = (name) => {
    setFoodName(name);
    setSuggestions([]);
    detectFood(name);
  };

  const handleReset = () => {
    setFoodName("");
    setNutrition(null);
    setAdvice("");
    setDetected(false);
    setSuggestions([]);
  };

  // Health Score
  const healthScore = nutrition
    ? Math.min(10, Math.max(1, Math.round(10 - nutrition.calories / 100)))
    : 0;

  // Pie Chart Data
  const pieData = nutrition
    ? {
        labels: ["Protein", "Carbs", "Fat"],
        datasets: [
          {
            data: [nutrition.protein, nutrition.carbs, nutrition.fat],
            backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            hoverOffset: 4,
          },
        ],
      }
    : null;

  return (
    <div className="container text-center mt-4 text-light">
      <h2 className="text-info mb-4 fw-bold">Smart Food Scanner</h2>

      <div className="card bg-dark text-light shadow-lg p-4 rounded-4 border border-info">
        {!detected ? (
          <>
            <input
              type="text"
              className="form-control mb-3 bg-secondary text-light border-0"
              placeholder="Enter food name..."
              value={foodName}
              onChange={(e) => {
                setFoodName(e.target.value);
                setSuggestions(
                  foodData
                    .filter(f => f.name.toLowerCase().includes(e.target.value.toLowerCase()))
                    .slice(0, 5)
                    .map(f => f.name)
                );
              }}
            />

            {suggestions.length > 0 && (
              <div className="list-group mb-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelectSuggestion(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <button className="btn btn-info w-50 fw-semibold" onClick={handleDetect}>
              Detect Food
            </button>

            {history.length > 0 && (
              <div className="mt-3 text-start">
                <h6>🔎 Recent Searches:</h6>
                <div>
                  {history.map((h, i) => (
                    <button
                      key={i}
                      className="btn btn-outline-secondary btn-sm m-1"
                      onClick={() => detectFood(h)}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h4 className="text-warning mt-3 text-capitalize">{foodName}</h4>

            <div className="row text-start mt-3">
              <div className="col">
                <p>Calories: <strong>{nutrition.calories}</strong></p>
              </div>
              <div className="col">
                <p>Carbs: <strong>{nutrition.carbs}g</strong></p>
              </div>
              <div className="col">
                <p>Protein: <strong>{nutrition.protein}g</strong></p>
              </div>
              <div className="col">
                <p>Fat: <strong>{nutrition.fat}g</strong></p>
              </div>
            </div>

            <div className="progress mb-2" style={{ height: 12 }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${healthScore * 10}%` }}
                aria-valuenow={healthScore}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <small className="text-success fw-semibold">Health Score: {healthScore}/10</small>

            {pieData && (
              <div className="my-3" style={{ maxWidth: 300, margin: "0 auto" }}>
                <Pie data={pieData} />
              </div>
            )}

            <div className="alert alert-success mt-3 fw-semibold">💡 {advice}</div>

            <button className="btn btn-outline-light w-100 mt-3" onClick={handleReset}>
              Try Another Food
            </button>

            <button
              className="btn btn-info w-100 mt-2"
              onClick={() => saveFavorites({ name: foodName, nutrition })}
            >
              💾 Save Food
            </button>

            {/* Favorites with Remove */}
            {favorites.length > 0 && (
              <div className="mt-3 text-start">
                <h6>⭐ Saved Foods:</h6>
                {favorites.map((f, i) => (
                  <div
                    key={i}
                    className="border p-2 rounded mb-1 d-flex justify-content-between align-items-center"
                  >
                    <span>{f.name} — {f.nutrition.calories} cal</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFavorite(f.name)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodScanner;
