import {useState} from "react";
import styled from "styled-components";
import CompanyName from "./CompanyName";
import Session from "./Section";
const Meta = styled.ul``;

const Button = styled.button``;

const Container = styled.div`
    height: 100%;
    margin-top: 10px;
`;
const Sessions = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: 120px;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

export default ({result, isMovie}) => {
    const [isSession, setIsSession] = useState(false);
    const toggleButton = () => {
        return setIsSession((prev) => !prev);
    };
    return (
        <Container>
            <Meta>
                {result.production_companies &&
                    result.production_companies.map((company, index) => (
                        <CompanyName key={index} {...company} />
                    ))}
            </Meta>
            {isMovie ? (
                ""
            ) : (
                <>
                    <Button onClick={toggleButton}>Session</Button>
                    <Sessions>
                        {isSession &&
                            result.seasons.map((session, index) => (
                                <Session {...session} key={index} />
                            ))}
                    </Sessions>
                </>
            )}
        </Container>
    );
};
