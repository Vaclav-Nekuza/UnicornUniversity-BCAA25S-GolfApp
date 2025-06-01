async function Call(baseUri, useCase, dtoIn, method) {
  // return fetch
  let response;
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:3000";

const FetchHelper = {
  course: {
    get: async (dtoIn) => {
      return await Call(baseUri, "course/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "course/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "course/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "course/delete", dtoIn, "post");
    },
    list: async (dtoIn) => {
      return await Call(baseUri, "course/list", dtoIn, "get");
    },
  },

  game: {
    get: async (dtoIn) => {
      return await Call(baseUri, "game/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "game/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "game/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "game/delete", dtoIn, "post");
    },
    list: async () => {
      return await Call(baseUri, "game/list", null, "get");
    },
  },
};

export default FetchHelper;
