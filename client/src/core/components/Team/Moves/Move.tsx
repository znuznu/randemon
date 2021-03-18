import React, { useEffect, useState } from 'react';

import Move from '../../../models/move';

type MoveProps = {
  move: Move;
};

const Move = ({ move }: MoveProps) => {
  return <div>{move.name}</div>;
};

export default Move;
