import {tvApi} from "api";
import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        loading: true,
        error: null,
    };
    async componentDidMount() {
        try {
            const {
                data: {results: topRated},
            } = await tvApi.topRated();
            const {
                data: {results: popular},
            } = await tvApi.popular();
            const {
                data: {results: airingToday},
            } = await tvApi.airingToday();
            this.setState({
                topRated,
                popular,
                airingToday,
            });
        } catch (error) {
            this.setState({
                error: "Cant find Tvs info",
            });
        } finally {
            this.setState({
                loading: true,
            });
        }
    }
    render() {
        const {topRated, popular, airingToday, loading, error} = this.state;
        console.log(topRated, popular, airingToday);
        return (
            <TVPresenter
                topRated={topRated}
                popular={popular}
                airingToday={airingToday}
                loading={loading}
                error={error}
            />
        );
    }
}