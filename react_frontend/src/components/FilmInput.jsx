import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function FilmInput(props) {
  const [film, setFilm] = useState({
    title: "",
    score: "",
    review: "",
  });

  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  const [hoveredStars, setHoveredStars] = useState(Array.from({ length: 6 }, (x, i) => false));
  const [clickedStars, setClickedStars] = useState(Array.from({ length: 6 }, (x, i) => false));

  function handleChange(event) {
    const { name, value } = event.target;
    setFilm((prevFilm) => {
      return {
        ...prevFilm,
        [name]: value,
      };
    });
  }

  function expandForm() {
    setIsFormExpanded(true);
  }

  function handleMouseEnter(id) {
    const newHoveredStars = hoveredStars.map((element, index) => { return (index <= id); });
    setHoveredStars(newHoveredStars);
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setHoveredStars(hoveredStars.map((element) => { return (false) }));
    setIsHovering(false);
  }

  function handleClick(id) {
    const newScore = clickedStars.map((element, index) => { return (index <= id); });
    setClickedStars(newScore);
    setFilm((prevFilm) => {
      return {
        ...prevFilm,
        score: id + 1,
      };
    })
  }

  function addFilm(event) {
    props.onAdd(film);
    setFilm({
      title: "",
      score: "",
      review: "",
    });
    setHoveredStars(Array.from({ length: 6 }, (x, i) => false));
    setClickedStars(Array.from({ length: 6 }, (x, i) => false));
    event.preventDefault();
  }

  return (
    <div>
      <form className="add-film"
        onClick={expandForm}>
        <input
          name="title"
          onChange={handleChange}
          value={film.title}
          placeholder="Title"
        />


        {isFormExpanded &&
          <div>
            <div onMouseLeave={handleMouseLeave}>
              {clickedStars.map((element, index) => {
                if (element || hoveredStars[index]) {
                  if (!hoveredStars[index] && isHovering) {
                    return (
                      <StarBorderIcon
                        key={index}
                        onClick={() => { handleClick(index) }}
                        onMouseEnter={() => { handleMouseEnter(index) }}
                        className="yellow"
                      />);
                  } else {
                    return (
                      <StarIcon
                        key={index}
                        onClick={() => { handleClick(index) }}
                        onMouseEnter={() => { handleMouseEnter(index) }}
                        className="yellow"
                      />);
                  }
                } else {
                  return (
                    <StarBorderIcon
                      key={index}
                      onClick={() => { handleClick(index) }}
                      onMouseEnter={() => { handleMouseEnter(index) }}
                    />
                  );
                }
              }
              )}
            </div>
            <div>
              <textarea
                name="review"
                onChange={handleChange}
                value={film.review}
                placeholder="Do you want to add something?"
                rows="3"

              />
              <Zoom in={true}>
                <Fab onClick={addFilm}>
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        }
      </form>
    </div >
  );
}

export default FilmInput;
