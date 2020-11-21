import styled from "styled-components";

export const SiteSwitcherBar = styled.section`
            background: #104134;
            height:48px;
            
            .switcher {
                float:left;
                opacity:0.5;
            }
            
            .switcher ul {
                list-style:none;
                margin:0;
                padding:0;
                
                opacity:0.8;
            }
            
            .switcher ul li {
                float:left;
                margin-right:15px;
            }
            
            .switcher ul li a {
                color:#fff;
            }
            
            .languageSelector {
                float: right;
                text-align: right;
                
                label {
                    padding-right: 5px;
                    display: none;
                }
            }

            .social {
                float: right;
                margin: 0 10px 0 0;

                .twitter {
                    margin: 3px 5px;
                    height: 20px;
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
        `;