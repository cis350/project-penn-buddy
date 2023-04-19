import React, { useState, useRef, useEffect } from "react";
// import PropTypes from "prop-types";
import { getUserById, changeUser } from "../api/users";

function Rating({ userId }) {
  const [rating, setRating] = useState(5);

  const [hover, setHover] = useState(0);
  const [ratingScore, setUserRating] = useState([]);
  const newScore = useRef(0);

  const [pennId, setPennId] = useState(0);
  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [number, setUserNumber] = useState('');
  const [year, setUserYear] = useState('');
  const [major, setUserMajor] = useState('');
  const [venmo, setUserVenmo] = useState('');
  const [bio, setUserBio] = useState('');
  const [password, setUserPassword] = useState('');

  useEffect(() => {
    async function getUserByIdWrapper() {
      // console.log('user id', userId);
      const response = await getUserById(userId);
      // console.log('user', response);
      setUserName(response.name);
      setPennId(response.pennId);
      setUserEmail(response.email);
      setUserNumber(response.number);
      setUserYear(response.year);
      setUserMajor(response.major);
      setUserVenmo(response.venmo);
      setUserBio(response.bio);
      setUserPassword(response.password);
      setUserRating(response.rating);
    }
    // run the wrapper function
    getUserByIdWrapper();
  });

  const createNewUser = async (newRating) => {
    const modifiedData = {
      id: userId,
      name,
      pennId,
      email,
      number,
      year,
      major,
      venmo,
      bio,
      rating: newRating,
      password,
    };
    // console.log('modified rating user', modifiedData);
    // console.log('user id to cu', userId);
    const response = await changeUser(userId, modifiedData);
  };

  const handleRate = (value) => {
    setRating(value);
    // console.log('value of the star clicked', value);
    const modRatingArr = [value];
    ratingScore.forEach((r) => {
      modRatingArr.push(r);
    });
    // console.log('modRatingarr', modRatingArr);
    createNewUser(modRatingArr);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={value <= rating ? "star filled" : "star"}
          onClick={() => handleRate(value)}
          onKeyDown={() => handleRate(value)}
          role="button"
          tabIndex="0"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;
