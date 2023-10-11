import React from "react";
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  color: #000000;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 10px 20px;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

function Evaluacion(){

    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <div>
            <Title>Evaluaciones</Title>
            <Button>Crear Evaluación</Button>
            <Button>Tipos de Evaluación</Button>
            <SearchContainer>
                <SearchInput
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchContainer>
        </div>
      );
    }
    
    export default Evaluacion