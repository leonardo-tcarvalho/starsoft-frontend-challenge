"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CardItem } from "./CardItem";

export function CardList() {
  const fetchData = async ({ pageParam = 1 }) => {
    try {
      const response = await fetch(
        `https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=${pageParam}&limit=8`
      );
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["projects"],
      queryFn: fetchData,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.metadata.hasNextPage
          ? lastPage.metadata.page + 1
          : undefined;
      },
    });

  const getLoadingWidth = (pageCount) => {
    return `${pageCount * 25}%`;
  };

  return (
    <div className="list-item">
      {status === "pending" ? (
        <div className="box-loading">
          <div className="loading"></div>
        </div>
      ) : status === "error" ? (
        <div className="box-loading">
          <div className="loading"></div>
        </div>
      ) : (
        <>
          {data.pages.flatMap((page) =>
            page.data.map((item) => (
              <CardItem
                key={item.id}
                id={item.id}
                imageSrc={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))
          )}
          <div className="search-more-button">
            <div>
              <div>
                {isFetchingNextPage ? (
                  <div className="loading-animation"></div>
                ) : hasNextPage ? (
                  <div
                    className="loading-bar"
                    style={{ width: getLoadingWidth(data.pages.length) }}
                  ></div>
                ) : (
                  <div className="percent-100"></div>
                )}
              </div>
              {isFetchingNextPage ? (
                <button
                  className="buttonHasNext"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  Carregando mais...
                </button>
              ) : hasNextPage ? (
                <button
                  className="buttonHasNext"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  Carregar mais
                </button>
              ) : (
                <button
                  className="buttonNotHasNext"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  Você já viu tudo
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
