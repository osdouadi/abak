import styled, {css} from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
    width: 12em;


    
`;

const Img = styled.img`
    height: auto;
    width: 300px;
    
`



function Logo() {
    return (
        <StyledLogo>
            <Img src="/images/logos/abak.png" alt="abak" />
        </StyledLogo>
    )
}

export default Logo;