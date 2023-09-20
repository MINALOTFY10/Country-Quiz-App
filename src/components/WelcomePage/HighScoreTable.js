import { useSelector } from "react-redux";
import "./HighScoreTable.css";

const HighScoreTable = () => {
  const highScores = useSelector((state) => state.highscore.highScores);

  return (
    <div className="table-container">
      <h2 className="score-heading">Top 5 Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((item, index) => (
            <tr className="top-score" key={index}>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScoreTable;
