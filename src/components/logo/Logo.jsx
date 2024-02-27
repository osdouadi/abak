import styled, {css} from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
    width: 12em;

    @media screen and (max-width: 850px) {
        z-index: 9999;
    }
    
`;

const Img = styled.img`
    height: auto;
    width: 250px;
    
`



function Logo() {
    return (
        <StyledLogo>
            <Img src="/images/logos/abak.png" alt="abak" />
        </StyledLogo>
    )
}

export default Logo;