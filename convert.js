const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("USDA.csv")
  .pipe(csv())
  .on("data", (row) => {
    results.push({
      name: row["Description"] || "Unknown",
      calories: row["Calories"] || "N/A",
      carbs: row["Carbohydrate"] || "N/A",
      protein: row["Protein"] || "N/A",
      fat: row["TotalFat"] || "N/A",
      advice: "Eat mindfully and maintain balance."
    });
  })
  .on("end", () => {
    // Make sure folder exists: src/data
    if (!fs.existsSync("src/data")) {
      fs.mkdirSync("src/data", { recursive: true });
    }

    fs.writeFileSync("src/data/foodDataset.json", JSON.stringify(results, null, 2));
    console.log("✅ CSV converted to JSON successfully!");
  });
