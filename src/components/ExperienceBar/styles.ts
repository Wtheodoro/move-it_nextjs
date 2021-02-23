import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;

    span {
        font-size: 1rem;
    }

    div {
        flex: 1;
        height: 4px;
        border-radius: 4px;
        background: red;
        margin: 0 1.5rem;
        position: relative;

        div{
            height: 4px;
            border-radius: 4px;
            background: green;
            margin: 0;
        }

        span.current-exp {
            position: absolute;
            top: 12px;
            transform: translateX(-50%)
        }
    }
`;
