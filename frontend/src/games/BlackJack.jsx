import React, { useState } from "react";
import { Button, Card, Row, Col, Typography, Space, Alert } from "antd";
import {
  PlayCircleOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const BlackjackGame = () => {
  const [gameState, setGameState] = useState({
    playerCards: [],
    playerScore: 0,
    dealerCards: [],
    dealerScore: 0,
    gameStarted: false,
    gameOver: false,
    message: "",
    loading: false,
  });

  const API_BASE_URL = "http://localhost:8000/api";

  const startGame = async () => {
    setGameState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/blackjack/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to start game");
      }

      const data = await response.json();

      setGameState({
        playerCards: data.playerCards,
        playerScore: data.playerScore,
        dealerCards: data.dealerCards,
        dealerScore: data.dealerScore,
        gameStarted: true,
        gameOver: false,
        message: "",
        loading: false,
      });
    } catch (error) {
      console.error("Error starting game:", error);
      setGameState((prev) => ({
        ...prev,
        message: "Ошибка при начале игры",
        loading: false,
      }));
    }
  };

  const hit = async () => {
    setGameState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/blackjack/hit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerCards: gameState.playerCards,
          dealerCards: gameState.dealerCards,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to draw card");
      }

      const data = await response.json();

      setGameState((prev) => ({
        ...prev,
        playerCards: data.playerCards,
        playerScore: data.playerScore,
        gameOver: data.gameOver,
        message: data.message,
        loading: false,
      }));
    } catch (error) {
      console.error("Error drawing card:", error);
      setGameState((prev) => ({
        ...prev,
        message: "Ошибка при взятии карты",
        loading: false,
      }));
    }
  };

  const stand = async () => {
    setGameState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/blackjack/stand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerCards: gameState.playerCards,
          dealerCards: gameState.dealerCards,
          playerScore: gameState.playerScore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to stand");
      }

      const data = await response.json();

      setGameState((prev) => ({
        ...prev,
        dealerCards: data.dealerCards,
        dealerScore: data.dealerScore,
        gameOver: true,
        message: data.message,
        loading: false,
      }));
    } catch (error) {
      console.error("Error standing:", error);
      setGameState((prev) => ({
        ...prev,
        message: "Ошибка при завершении хода",
        loading: false,
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      playerCards: [],
      playerScore: 0,
      dealerCards: [],
      dealerScore: 0,
      gameStarted: false,
      gameOver: false,
      message: "",
      loading: false,
    });
  };

  // Функция для получения цвета масти
  const getSuitColor = (suit) => {
    if (!suit) return "#000";

    const suitLower = suit.toLowerCase();
    if (suitLower === "hearts" || suitLower === "diamonds") {
      return "#ff4d4f"; // красный для червей и бубен
    }
    return "#000"; // черный для пик и треф
  };

  // Функция для отображения символа масти
  const getSuitSymbol = (suit) => {
    if (!suit) return "?";

    const suitLower = suit.toLowerCase();
    switch (suitLower) {
      case "hearts":
        return "♥";
      case "diamonds":
        return "♦";
      case "clubs":
        return "♣";
      case "spades":
        return "♠";
      default:
        return suit; // возвращаем оригинальный текст если не распознано
    }
  };

  const renderCard = (card, index) => {
    if (!card) return null;

    const suitColor = getSuitColor(card.suit);
    const suitSymbol = getSuitSymbol(card.suit);

    return (
      <Card
        key={index}
        style={{
          width: 80,
          height: 120,
          margin: "0 5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          border: "2px solid #d9d9d9",
          borderRadius: 8,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Text strong style={{ fontSize: "18px", color: suitColor }}>
            {card.value}
          </Text>
          <br />
          <Text
            style={{
              fontSize: "20px",
              color: suitColor,
              lineHeight: "1.2",
            }}
          >
            {suitSymbol}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: "10px", marginTop: "5px" }}>
            {card.suit}
          </Text>
        </div>
      </Card>
    );
  };

  // Функция для рендеринга карт дилера (первая карта может быть скрыта)
  const renderDealerCard = (card, index) => {
    if (!card) return null;

    // Если игра не закончена, скрываем вторую карту дилера
    if (
      !gameState.gameOver &&
      index === 1 &&
      gameState.dealerCards.length > 1
    ) {
      return (
        <Card
          key={index}
          style={{
            width: 80,
            height: 120,
            margin: "0 5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1890ff",
            border: "2px solid #1890ff",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Text strong style={{ fontSize: "18px", color: "#fff" }}>
              ?
            </Text>
          </div>
        </Card>
      );
    }

    return renderCard(card, index);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        🎮 Блэкджек
      </Title>

      {/* Сообщения об ошибках или результатах */}
      {gameState.message && (
        <Alert
          message={gameState.message}
          type={gameState.gameOver ? "info" : "warning"}
          showIcon
          style={{ marginBottom: "20px" }}
        />
      )}

      {/* Карты дилера */}
      <Card style={{ marginBottom: "20px" }}>
        <Title level={4}>Дилер</Title>
        <Text strong>
          Очки:{" "}
          {gameState.gameStarted
            ? gameState.gameOver
              ? gameState.dealerScore
              : "?"
            : 0}
        </Text>
        <Row style={{ marginTop: "10px", minHeight: "120px" }}>
          {gameState.dealerCards.map((card, index) =>
            renderDealerCard(card, index)
          )}
        </Row>
      </Card>

      {/* Карты игрока */}
      <Card style={{ marginBottom: "30px" }}>
        <Title level={4}>Игрок</Title>
        <Text strong>Очки: {gameState.playerScore}</Text>
        <Row style={{ marginTop: "10px", minHeight: "120px" }}>
          {gameState.playerCards.map((card, index) => renderCard(card, index))}
        </Row>
      </Card>

      {/* Кнопки управления */}
      <Space
        direction="vertical"
        style={{ width: "100%", textAlign: "center" }}
        size="large"
      >
        {!gameState.gameStarted ? (
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={startGame}
            loading={gameState.loading}
            size="large"
          >
            Начать игру
          </Button>
        ) : (
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={hit}
              disabled={gameState.gameOver || gameState.loading}
              loading={gameState.loading}
            >
              Взять карту
            </Button>
            <Button
              icon={<StopOutlined />}
              onClick={stand}
              disabled={gameState.gameOver || gameState.loading}
              loading={gameState.loading}
            >
              Хватит
            </Button>
            <Button onClick={resetGame} disabled={gameState.loading}>
              Новая игра
            </Button>
          </Space>
        )}
      </Space>

      {/* Инструкция */}
      {!gameState.gameStarted && (
        <Alert
          message="Инструкция"
          description="Нажмите 'Начать игру' чтобы получить начальные карты. Затем берите карты или останавливайтесь."
          type="info"
          style={{ marginTop: "20px" }}
        />
      )}
    </div>
  );
};

export default BlackjackGame;
