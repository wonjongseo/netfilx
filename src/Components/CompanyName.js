import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
const Item = styled.li`
    margin-bottom: 10px;
`;

const CompanyName = ({name, origin_country}) => (
    <Item>
        {name}
        {origin_country ? <> / {origin_country} </> : ""}
    </Item>
);

CompanyName.prototype = {
    name: PropTypes.string.isRequired,
    origin_country: PropTypes.string,
};
export default CompanyName;
