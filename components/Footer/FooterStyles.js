import styled from "styled-components";

export const SiteFooter = styled.footer`
    margin: 75px 16px 30px 16px;
    padding-bottom: 20px;

    p { color: #aaa; font-size:12px; text-align:center; }
    p a { color: #fff; text-decoration:none; }


    .support {
        margin: 0 16px 60px 16px;

        a {
            padding:13px 15px;
            background: #e52727;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            font-family: 'LeagueSpartan';
            line-height:25px;
        }

        a:hover {
            opacity: 0.85 !important;
            color:#fff;
        }

        img {
            margin-right:10px;
            padding-bottom:1px;
            vertical-align:middle;
        }
    }

    .supportFontFallback a {
        font-family: 'Arial Black';
    }
`;