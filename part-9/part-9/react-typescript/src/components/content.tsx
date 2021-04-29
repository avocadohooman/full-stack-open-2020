import React from 'react';
import { Course } from '../models/courseModel';

const Content = ({courseParts} : {courseParts: Course[]}) => {

    return (
        <>
            {courseParts.map(content => {
            return (
                <p key={content.name}>
                {content.name} {content.exerciseCount}
                </p> 
            )
            })
            }
        </>

    )
}

export default Content;