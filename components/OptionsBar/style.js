import styled from "styled-components";

export const Bar = styled.section`
            background: #e52727;
            color: #ffffff;
            padding: 0 16px;
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            margin: 10px 0 15px 0;
            border-radius: 3px 3px 3px 3px;
            -moz-border-radius: 3px 3px 3px 3px;
            -webkit-border-radius: 3px 3px 3px 3px;
            text-align: center;
            
            a {
                color: #c0f5e4;
                display:block;
                cursor:pointer;
            }
            a:hover {
                color: #c0f5e4;
            }
            
            .currentTimezone a {
                color: #ffffff;
            }

            strong {
                color: #fff;
                text-decoration: underline;
            }
            select {
                margin: 0 5px;
            }
            button {
                background: #fff;
                color: #e52727;
                padding: 3px;
                border: 0;
                -webkit-border-radius: 3px;
                -moz-border-radius: 3px;
                border-radius: 3px;
                cursor: pointer;
            }
            
            
            @media screen and (max-width: 900px) {
                font-size:12px;
               
                .pickerLabel {
                    display: none;
                }

                .picker {
                    margin: 0 auto;
                }

                select {
                    width: calc(100% - 90px);
                }
                button {
                    width: 80px;
                }
            }
        `;