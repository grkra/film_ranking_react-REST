import React from "react";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function Film(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  function showScore() {
    const score = new Array(6);
    for (let i = 0; i < 6; i++) {
      score[i] = (i < (props.score) ? <StarIcon key={i} /> : <StarBorderIcon key={i} />);
    }
    return score;
  }

  return (
    <div className="film">
      <h3>{props.title}</h3>
      <p className="score">{showScore()}</p>
      <p>{props.review}</p>
      <Fab onClick={handleClick} color='inherit'>
        <DeleteIcon />
      </Fab>
    </div>
  );
}

export default Film;
