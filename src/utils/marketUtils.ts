// src/utils/marketUtils.ts

import { Market } from '../types/types';

export const getMarketTasksInfo = (marketRef: string, markets: Market[]) => {
  const marketTasks = markets.find(market => market.marketRef === marketRef)?.tasks || [];
  const marketStatus = marketTasks.every(task => task.status === 'TERMINE')
    ? 'TERMINE'
    : marketTasks.some(task => task.status === 'EN_COURS')
    ? 'EN_COURS'
    : 'NON_COMMENCE';
  const lastAddedTask = marketTasks.length > 0 ? [marketTasks[marketTasks.length - 1]] : [];
  return { marketStatus, lastAddedTask };
};
