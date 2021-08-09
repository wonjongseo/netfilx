import {moviesApi, tvApi} from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: {pathname},
        } = props;
        // 라우터에서 props을 받아와
        // pathname을 가져온다
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/"),
            // Detail Component가 moive와 tv 둘 다 랜더링 하기 때문에
            // include 메세더르도 url 을 확인해 줘야하낟.
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: {id},
            },
            history: {push},
        } = this.props;
        const {isMovie} = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        try {
            if (isMovie) {
                ({data: result} = await moviesApi.movieDetail(parsedId));
            } else {
                ({data: result} = await tvApi.showDetail(parsedId));
            }
        } catch {
            this.setState({error: "Can't find anything."});
        } finally {
            this.setState({loading: false, result});
        }
    }
    render() {
        const {result, error, loading} = this.state;
        console.log(result);
        return (
            <DetailPresenter result={result} error={error} loading={loading} />
        );
    }
}
