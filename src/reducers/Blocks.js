import {
  RESET_BLOCK_ID,
  SORT_BLOCKS,
  ADD_BLOCK_FIRST,
  ADD_BLOCK_LAST,
  ADD_BLOCK_OVER,
  ADD_BLOCK_BETWEEN,
  DELETE_BLOCK,
  CLEAR_BLOCK,
  SELECT_BLOCK,
  CURRENT_BLOCK,
  UPDATE_BLOCK_TEXT,
  UPDATE_BLOCK_TIME,
  NEW_BLOCK_FILE,
  LOAD_BLOCK_FILE,
  SAVED_BLOCK_FILE,
  UNSAVED_BLOCK_FILE
} from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  blocks: [],
  selectedBlockId: null,
  currentBlockId: null,
  blockFilePath: '',
  blockFileSaved: false
};

export default function blocks(state = initialState, action) {
  switch (action.type) {
    // Reset blocks' ID with index.
    case RESET_BLOCK_ID:
      return update(state, {
        blocks: {
          $apply: (blocks) => {
            return blocks.map((block, index) => {
              var obj = block;
              obj.id = index + 1;
              return obj;
            });
          }
        }
      });
    // Sort blocks by value of startTime
    case SORT_BLOCKS:
      var sortedBlocks = state.blocks.slice().sort(function(a, b) {
        if(a.startTime > b.startTime) {
          return 1;
        } else if(a.startTime < b.startTime) {
          return -1;
        } else {
          return 0;
        }
      });

      return update(state, {
        blocks: {
          $set: sortedBlocks
        }
      });
    // 첫번째 블록을 만들거나 맨 앞 부분에 새 블록을 추가
    case ADD_BLOCK_FIRST:
      return update(state, {
        blocks: {
          $unshift: [{
            id: 1,
            subtitle: '',
            startTime: action.startTime,
            endTime: action.endTime
          }]
        },
        currentBlockId: { $set: 1 },
        selectedBlockId: { $set: 1 }
      });
    // 맨 마지막에 새 블록 추가
    case ADD_BLOCK_LAST:
      return update(state, {
        blocks: {
          $push: [{
            id: state.blocks.length + 1,
            subtitle: '',
            startTime: action.startTime,
            endTime: action.endTime
          }]
        },
        currentBlockId: { $set: state.blocks.length + 1 },
        selectedBlockId: { $set: state.blocks.length + 1 }
      });
    // 어떤 블록 위에서 새 블록 추가
    case ADD_BLOCK_OVER:
      return update(state, {
        blocks: {
          [state.currentBlockId - 1]: {
            endTime: { $set: action.startTime}
          },
          $splice: [[
            state.currentBlockId, 0, {
              id: state.currentBlockId + 1,
              subtitle: '',
              startTime: action.startTime,
              endTime: action.endTime
            }
          ]]
        },
        currentBlockId: { $set: state.currentBlockId + 1 },
        selectedBlockId: { $set: state.currentBlockId + 1 }
      });
    // 블록을 두 블록 사이에 새 블록 추가
    case ADD_BLOCK_BETWEEN:
      return update(state, {
        blocks: {
          $splice: [[
            action.nextBlockId - 1, 0, {
              id: action.nextBlockId,
              subtitle: '',
              startTime: action.startTime,
              endTime: action.endTime
            }
          ]]
        },
        currentBlockId: { $set: action.nextBlockId },
        selectedBlockId: { $set: action.nextBlockId }
      });
    // 선택된 블록 삭제
    // update를 이용해 리턴하는 것으로 만들기
    case DELETE_BLOCK:
      return update(state, {
        blocks: {
          $splice: [[
            action.id - 1, 1
          ]]
        },
        selectedBlockId: { $set: null }
      });
    // 선택된 블록 초기화
    case CLEAR_BLOCK:
      return update(state, {
        blocks: {
          [action.id - 1]: {
            subtitle: { $set: '' }
          }
        }
      });
    // 블록 하나 선택
    case SELECT_BLOCK:
      return update(state, {
        selectedBlockId: { $set: action.id }
      });
    // 현재 재생 위치에 있는 블록
    case CURRENT_BLOCK:
      return update(state, {
        currentBlockId: { $set: action.id }
      });
    // 선택된 블록 자막 수정
    case UPDATE_BLOCK_TEXT:
      return update(state, {
        blocks: {
          [state.currentBlockId - 1]: {
            subtitle: { $set: action.subtitle }
          }
        }
      });
    // 블록 시간 수정
    case UPDATE_BLOCK_TIME:
      return update(state, {
        blocks: {
          [action.id - 1]: {
            startTime: { $set: action.startTime },
            endTime: { $set: action.endTime }
          }
        }
      });
    // 자막 파일 초기화
    case NEW_BLOCK_FILE:
      return update(state, {
        blocks: { $set : [] }
      });
    // 자막 파일 블록으로 불러오기
    case LOAD_BLOCK_FILE:
      return update(state, {
        blocks: { $set: action.blocks }
      });
    // 한 번 이상 저장된 자막 파일로 설정
    case SAVED_BLOCK_FILE:
      return update(state, {
        blockFilePath: { $set: action.path },
        blockFileSaved: { $set: true }
      });
    // 저장되지 않은 자막 파일로 설정
    case UNSAVED_BLOCK_FILE:
      return update(state, {
        blockFilePath: { $set: '' },
        blockFileSaved: { $set: false }
      });

    default:
      return state;
  }
}
