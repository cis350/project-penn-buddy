import React, { useState, useRef, useEffect } from "react";
import { getUserById, changeUser } from "../api/users";

function Rating({ userId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingScore, setUserRating] = useState([]);
  const newScore = useRef(0);

  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [number, setUserNumber] = useState('');
  const [year, setUserYear] = useState('');
  const [major, setUserMajor] = useState('');
  const [venmo, setUserVenmo] = useState('');
  const [bio, setUserBio] = useState('');
  // CHANGED RATING TO ARRAY
  const [password, setUserPassword] = useState('');

  useEffect(() => {
    async function getUserByIdWrapper() {
      console.log('userId', userId);
      const response = await getUserById(userId);
      console.log('response', response);

      setUserName(response.name);
      setUserEmail(response.email);
      setUserNumber(response.number);
      setUserYear(response.year);
      setUserMajor(response.major);
      setUserVenmo(response.venmo);
      setUserBio(response.bio);
      setUserPassword(response.password);

      console.log('rating', response.rating);
      setUserRating(response.rating);
      // const ratingArr = response.rating;
      console.log('rating array', ratingScore);
      // setUserRating(average(ratingArr));
      // console.log('average rating', ratingScore);
    }
    // run the wrapper function
    getUserByIdWrapper();
  });

  // const modifyRatingOnServer = async (id, modData) => {
  //   // console.log('text input', message);
  //   // console.log('mod text from ', currChatId);
  //   const response = await changeUser(userId, modData);
  // };

  const createNewUser = async (newRating) => {
    const modifiedData = {
      id: userId,
      name,
      email,
      number,
      year,
      major,
      venmo,
      bio,
      rating: newRating,
      password,
    };
    const response = await changeUser(userId, modifiedData);
  };

  const handleRating = () => {
    // update the login state
    // console.log('clicked');
    console.log('clicked');
    // it's successfully adding 1 now
    // now, I need to find a way for it to read in the index of the star
    console.log('score is set to', 1);
    setRating(1);
    const modRatingArr = [1];
    ratingScore.forEach((r) => {
      modRatingArr.push(r);
    });
    console.log('modRatingarr', modRatingArr);
    createNewUser(modRatingArr);
  };

  return (
    <div>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((index) => {
          // index += 1
          const keyValue = index;
          return (
            <button
              type="button"
              key={keyValue}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={handleRating}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>

  );
}

export default Rating;
