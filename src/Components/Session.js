import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Name = styled.div``;
const Post = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(prev) => (prev.bgImage ? prev.bgImage : "black")});
    background-position: center center;
    background-size: cover;
`;
const Session = ({name, air_date}) => (
    <>
        <Name>{name}</Name>
        <Post
            bgImage={`https://image.tmdb.org/t/p/original${session.poster_path}`}
        >
            {air_date}
        </Post>
    </>
);

Session.prototype = {
    name: PropTypes.string.isRequired,
    air_date: PropTypes.string,
};

export default Session;
