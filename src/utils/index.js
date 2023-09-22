export function getRegionStartAndEnd({ row, col }) {
  const rowStart = 3 * Math.floor(row / 3);
  const rowEnd = rowStart + 2;
  const colStart = 3 * Math.floor(col / 3);
  const colEnd = colStart + 2;
  return { rowStart, rowEnd, colStart, colEnd };
}

export function checkCellIsDisabled({ initialBoard, row, col }) {
  return initialBoard?.[row]?.[col];
}
