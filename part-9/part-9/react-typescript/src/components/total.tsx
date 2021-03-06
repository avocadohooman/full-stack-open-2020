import React from 'react';
import { Course } from '../models/courseModel';


const Total = ({courseParts} : {courseParts: Course[]}) => {

    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
}

export default Total;