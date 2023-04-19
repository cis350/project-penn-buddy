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
    console.log('modified rating user', modifiedData);
    console.log('user id to cu', userId);
    const response = await changeUser(userId, modifiedData);
  };

  const handleRate = (value) => {
    setRating(value);
    console.log('value of the star clicked', value);
    const modRatingArr = [value];
    ratingScore.forEach((r) => {
      modRatingArr.push(r);
    });
    console.log('modRatingarr', modRatingArr);
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

// Rating.propTypes = {
//   initialValue: PropTypes.number.isRequired,
//   onRate: PropTypes.func.isRequired,
// };

// export default StarRating;

// function Rating({ userId }) {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [ratingScore, setUserRating] = useState([]);
//   const newScore = useRef(0);

//   const [pennId, setPennId] = useState(0);
//   const [name, setUserName] = useState('');
//   const [email, setUserEmail] = useState('');
//   const [number, setUserNumber] = useState('');
//   const [year, setUserYear] = useState('');
//   const [major, setUserMajor] = useState('');
//   const [venmo, setUserVenmo] = useState('');
//   const [bio, setUserBio] = useState('');
//   // CHANGED RATING TO ARRAY
//   const [password, setUserPassword] = useState('');

//   // keep chatroom tht can be a ref
//   // id of chatrooms by the state currchatud

//   useEffect(() => {
//     async function getUserByIdWrapper() {
//       const response = await getUserById(userId);
//       // console.log('user', response);
//       // console.log('rating', response.rating);
//       setUserName(response.name);
//       setPennId(response.pennId);
//       setUserEmail(response.email);
//       setUserNumber(response.number);
//       setUserYear(response.year);
//       setUserMajor(response.major);
//       setUserVenmo(response.venmo);
//       setUserBio(response.bio);
//       setUserPassword(response.password);
//       setUserRating(response.rating);
//     }
//     // run the wrapper function
//     getUserByIdWrapper();
//   });

//   const createNewUser = async (newRating) => {
//     const modifiedData = {
//       id: userId,
//       name,
//       pennId,
//       email,
//       number,
//       year,
//       major,
//       venmo,
//       bio,
//       rating: newRating,
//       password,
//     };
//     const response = await changeUser(userId, modifiedData);
//   };

//   const handleRating = () => {
//     setRating(1);
//     const modRatingArr = [1];
//     ratingScore.forEach((r) => {
//       modRatingArr.push(r);
//     });
//     // console.log('modRatingarr', modRatingArr);
//     createNewUser(modRatingArr);
//   };

//   return (
//     <div>
//       <div className="star-rating" data-testid="rating">
//         {[1, 2, 3, 4, 5].map((index) => {
//           // index += 1
//           const keyValue = index;
//           return (
//             <button
//               data-testid="star-button"
//               type="button"
//               key={keyValue}
//               className={index <= (hover || rating) ? "on" : "off"}
//               onClick={handleRating}
//               onMouseEnter={() => setHover(index)}
//               onMouseLeave={() => setRating(rating)}
//             >
//               <span className="star" data-testid="stars">&#9733;</span>
//             </button>
//           );
//         })}
//       </div>
//     </div>

//   );
// }

export default Rating;
