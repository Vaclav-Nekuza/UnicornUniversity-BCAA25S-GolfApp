import { createContext, useState, useEffect } from "react";

import FetchHelper from "../fetch-helper.js";

export const GameListContext = createContext();

function GameListProvider({ children }) {
  const [gameListDto, setGameListDto] = useState({
    state: "ready", // ready / pending / error
    data: null,
    error: null,
  });

  console.log(gameListDto);

  async function handleLoad() {
    setGameListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.game.list();
    setGameListDto((current) => {
      if (result.ok) {
        return {
          ...current,
          state: "ready",
          data: result.data,
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }

  async function handleCreate(dtoIn) {
    setGameListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.game.create(dtoIn);
    setGameListDto((current) => {
      if (result.ok) {
        current.data.itemList.push(result.data);
        return {
          ...current,
          state: "ready",
          data: { itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }

  async function handleUpdate(dtoIn) {
    setGameListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.game.update(dtoIn);
    setGameListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList[itemIndex] = dtoIn;
        return {
          ...current,
          state: "ready",
          data: { itemList: current.data.itemList.slice() },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });
  }

  async function handleDelete(dtoIn) {
    setGameListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.game.delete(dtoIn);
    setGameListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: { itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  useEffect(() => {
    handleLoad();
  }, []);

  const value = {
    ...gameListDto,
    handlerMap: { handleLoad, handleCreate, handleUpdate, handleDelete },
  };

  return (
    <GameListContext.Provider value={value}>
      {children}
    </GameListContext.Provider>
  );
}

export default GameListProvider;
