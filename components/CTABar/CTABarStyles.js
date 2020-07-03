import styled from "styled-components";

export const CTA = styled.a`
            background: #117465;
            color: #b2f5e0;
            text-indent: 50px;
            height: 50px;
            line-height: 51px;
            vertical-align: middle;
            margin: 10px 0 15px 0;
            border-radius: 3px 3px 3px 3px;
            -moz-border-radius: 3px 3px 3px 3px;
            -webkit-border-radius: 3px 3px 3px 3px;
            font-size: 12px;
            position: relative;
            display: block;
            width: 100%;
            color: #fff;
            cursor:pointer;
    
            :hover {
                background: #0a5f53;
                color:#fff;
            }


            .icon {
                width: 15px;
                position: absolute;
                top: 16px;
                left: 16px;
            }

            .mailIcon {
                width: 20px;
                position: absolute;
                top: 18px;
                left: 16px;
            }

            .arrow {
                width: 10px;
                position: absolute;
                top: 21px;
                right: 10px;
                }
        `;