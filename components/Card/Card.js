import styled from "styled-components";

export const Card = styled.section`
    background:#141414;
    -webkit-border-radius: 15px;					
    -moz-border-radius: 15px;
    padding:25px 25px 25px 25px;
    margin-bottom:16px;
    
    p {
        margin-bottom: 15px
    }
    
    form {
    
        fieldset {
            border:0;
            margin:0 0 20px 0;
            padding: 0;
            vertical-align:middle;
        }
        
        label {
            padding-left:5px;
        
            a {
                color: #1a8b73;
            }
        }
        
        .row {
            label {
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            input {
                display: block;
                width: 100%;
                background: #000;
                color: #fff;
                border: 0;
                padding: 15px;
                font-size: 15px;
                margin: 10px 0;
            }
        }
        
        .hidden {
            display:none;
        }
        
        .button {
            background: #1a8b73;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            padding: 12px 15px;
            font-size:15px;
            border:0;
            color:#fff;
            cursor: pointer;
            
            :hover {
                color:#ccc;    
            }
        }
        
        .copyable {
            font-family:monospace;
            color:#2a2a2a;
            background:#FFF;
            padding:.5em;
            border-radius:4px;
            margin-top:.5em;
            width:100%;
        }
    }    
`;
