body{
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background: #e8f5e9;
}

.container{
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

h1{
    text-align: center;
    color: #1b5e20;
}

h3{
    text-align: center;
    color: #2e7d32;
}

.form-section{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

input{
    flex: 1;
    min-width: 150px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #999;
    font-size: 16px;
}

button{
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background: #2e7d32;
    color: white;
    cursor: pointer;
    font-size: 16px;
}

button:hover{
    background: #1b5e20;
}

.item{
    background: white;
    margin-top: 15px;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
}

.item h3{
    margin: 0;
    color: #1b5e20;
}

.low{
    border-left: 8px solid red;
}

.high{
    border-left: 8px solid green;
}

.item-buttons{
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.delete-btn{
    background: #c62828;
}

.delete-btn:hover{
    background: #8e0000;
}

.edit-btn{
    background: #1565c0;
}

.edit-btn:hover{
    background: #003c8f;
}

@media(max-width: 600px){

    .form-section{
        flex-direction: column;
    }

    input{
        width: 100%;
    }

    button{
        width: 100%;
    }
}
