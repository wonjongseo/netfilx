import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import {Helmet} from "react-helmet";
import {Link, Route} from "react-router-dom";
import Company from "Components/Company";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const MoreDetail = styled.div`
    margin-top: 5px;
`;

const Imdb = styled.a`
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 20px;
    background-color: red;
`;

const Backdrop = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(3px);
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center center;
    z-index: 0;
    height: 100%;
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    height: 50%;
    width: 70%;
    margin-left: 15px;
`;
const AA = styled.div`
    height: 120px;
    text-overflow: ellipsis;
`;

const Title = styled.h3`
    display: flex;
    align-items: center;
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
    font-size: 20px;
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const DetailPresenter = ({result, loading, isMovie, error}) => {
    return loading ? (
        <>
            <Helmet>
                <title> Loading | NetFlix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <>
            <Container>
                <Helmet>
                    <title>
                        {result.original_title
                            ? result.original_title
                            : result.original_name}{" "}
                        |{" "}
                    </title>
                </Helmet>
                <Backdrop
                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                ></Backdrop>
                <Content>
                    <Cover
                        bgImage={
                            result.poster_path
                                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                                : ""
                        }
                    />
                    <Data>
                        <Title>
                            {result.original_title
                                ? result.original_title
                                : result.original_name}
                            <Imdb
                                target="_black"
                                href={`https://www.imdb.com/title/${result.imdb_id}/`}
                            >
                                IMDB
                            </Imdb>
                        </Title>
                        <ItemContainer>
                            <Item>
                                {result.release_date
                                    ? result.release_date.substring(0, 4)
                                    : result.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {`${result.runtime}min` ||
                                    `${result.episode_run_time}min`}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres &&
                                    result.genres.map((genre, index) =>
                                        index === result.genres.length - 1
                                            ? genre.name
                                            : `${genre.name} / `
                                    )}
                            </Item>{" "}
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                        <MoreDetail>
                            {isMovie ? (
                                <Link to={`/movie/${result.id}/detail`}>
                                    <button>More Detail</button>
                                </Link>
                            ) : (
                                <Link to={`/show/${result.id}/detail`}>
                                    <button> More Detail</button>
                                </Link>
                            )}
                            {isMovie ? (
                                <Route path="/movie/:id/detail">
                                    <Company
                                        isMovie={isMovie}
                                        result={result}
                                    />
                                </Route>
                            ) : (
                                <Route path="/show/:id/detail">
                                    <Company
                                        result={result}
                                        isMovie={isMovie}
                                    />
                                </Route>
                            )}
                        </MoreDetail>
                    </Data>
                </Content>
            </Container>
        </>
    );
};

DetailPresenter.prototype = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default DetailPresenter;
