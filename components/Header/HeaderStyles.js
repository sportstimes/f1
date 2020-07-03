import styled from "styled-components";

export const HeaderBar = styled.header`
            background: #011612;
            color: #fff;
            margin-bottom: 16px;
            
            .languageSelector {
                float: right;
                margin-top: 45px;
                text-align: right;
                
                label {
                    padding-right: 5px;
                    display: none;
                }
            }

            .social {
                float: right;
                margin: 32px 15px 0 0;

                .twitter {
                    margin: 10px;
                    height: 25px;
                }
            }

            .clear {
                clear: both;
            }

            .container {
                max-width: 1000px;
                padding: 8px 16px;
                margin: 0 auto;
            }
            
            @media screen and (max-width: 900px) {
                .languageSelector {
                    margin: 4px 0 18px 0;
                    float: none;
                    display: block;
                    text-align: center;
                }

                .social {
                    float: none;
                    display: none;
                }
            }
        }
        `;

export const Branding = styled.div`
            padding: 25px 0;
            float: left;
            
            .logomark {
                float: left;
                width: 60px;
                height: 60px;
                margin-right: 24px;
            }
            
            .brandingText {
                float: left;

                h1 {
                    font-size: 16px;
                    margin: 0;
                    padding-top: 8px;
                    font-family: "LeagueSpartan";
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }

                h1 a {
                    color: #ffffff;
                }

                h2 {
                    font-size: 11px;
                    color: #33a789;
                    text-transform: uppercase;
                    margin: 0;
                    letter-spacing: 2px;
                    font-size: 11px;
                    font-family: "LeagueSpartan";
                }

                h2 a {
                    color: #33a789;
                }
            }

            .brandingTextFallback {
                float: left;

                h1 {
                    font-size: 16px;
                    margin: 0;
                    padding-top: 8px;
                    font-family: "Arial Black";
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }

                h1 a {
                    color: #ffffff;
                }

                h2 {
                    font-size: 11px;
                    color: #33a789;
                    text-transform: uppercase;
                    margin: 0;
                    letter-spacing: 2px;
                    font-size: 11px;
                    font-family: "Arial Black";
                }

                h2 a {
                    color: #33a789;
                }
            }
            
             @media screen and (max-width: 900px) {
                float:none;
             
             
                .logomark {
                    margin: 0 auto 10px auto;
                    float: none;
                    display:block;
                }

                .brandingText {
                    float: none;
                    margin: 0 auto;
                    text-align:center;
                }

                h1 {
                    margin-bottom: 16px;
                    font-size: 14px;
                }

                h2 {
                    margin-bottom: 0;
                    font-size: 10px;
                }

                .branding {
                    padding: 25px 0 10px 0;
                    float: none;
                }
            }
        `;
