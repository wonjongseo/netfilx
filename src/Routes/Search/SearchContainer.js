import {moviesApi, tvApi} from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "code",
        loading: false,
        error: null,
    };
    handleSubmit() {
        const {searchTerm} = this.state;
        if (searchTerm !== "") {
            this.seacrhByTerm();
        }
    }

    async seacrhByTerm() {
        const {searchTerm} = this.state;
        this.setState({loading: true});

        try {
            const {
                data: {results: movieResults},
            } = await moviesApi.search(searchTerm);

            const {
                data: {results: tvResults},
            } = await tvApi.search(searchTerm);

            this.setState({
                movieResults,
                tvResults,
            });
        } catch (error) {
            this.setState({
                error: "Cant find results",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }
    render() {
        const {movieResults, tvResults, searchTerm, loading, error} =
            this.state;
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}