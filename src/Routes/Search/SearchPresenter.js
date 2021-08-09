import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import {Helmet} from "react-helmet";

const Container = styled.div`
    padding: 20px;
    margin-bottom: 20px;
`;

const Form = styled.form`
    margin: 50px 0px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

const SearchPresenter = ({
    movieResults,
    tvResults,
    searchTerm,
    loading,
    error,
    updateTerm,
    handleSubmit,
}) => (
    <Container>
        <Helmet>
            <title>Search | NetFlix</title>
        </Helmet>
        <Form onSubmit={handleSubmit}>
            <Input
                placeholder="Search Moives or TV shows"
                value={searchTerm}
                onChange={updateTerm}
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {movieResults && movieResults.length > 0 && (
                        <Section title="Movie">
                            {movieResults.map((movie) => (
                                <Poster
                                    key={movie.id}
                                    id={movie.id}
                                    imageUrl={movie.poster_path}
                                    title={movie.original_title}
                                    rating={movie.vote_average}
                                    year={movie.release_date.substring(0, 4)}
                                    isMovie={true}
                                />
                            ))}
                        </Section>
                    )}
                    {tvResults && tvResults.length > 0 && (
                        <Section title="TV">
                            {tvResults.map((show) => (
                                <Poster
                                    key={show.id}
                                    id={show.id}
                                    imageUrl={show.poster_path}
                                    title={show.original_name}
                                    rating={show.vote_average}
                                    year={
                                        show.first_air_date &&
                                        show.first_air_date.substring(0, 4)
                                    }
                                />
                            ))}
                        </Section>
                    )}
                    {error && <Message color="#e74c3c" text={error} />}
                    {tvResults &&
                        movieResults &&
                        tvResults.length === 0 &&
                        movieResults.length === 0 && (
                            <Message text="Nothing found" color="#95a5a6" />
                        )}
                </>
            )}
        </Form>
    </Container>
);

SearchPresenter.prototype = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
