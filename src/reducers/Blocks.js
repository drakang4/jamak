import {
  ADD_BLOCK,
  DELETE_BLOCK,
  CLEAR_BLOCK,
  SELECT_BLOCK,
  CANCEL_BLOCK,
  UPDATE_BLOCK_TEXT,
  UPDATE_BLOCK_TIME,
  LOAD_BLOCK_FILE,
  SAVED_BLOCK_FILE,
  UNSAVED_BLOCK_FILE
} from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  blocks: [],
  selectedBlockId: null,
  currentBlockId: null,
  beforeBlockId: null,
  afterBlockId: null,
  blockFilePath: null,
  blockFileSaved: false
};

export default function blocks(state = initialState, action) {
  switch (action.type) {
    // 새 블록 추가
    // push 말고 splice로 하기
    case ADD_BLOCK:
      return update(state, {
        blocks: {
          $push: [{
            id: state.blocks.length + 1,
            subtitle: '',
            startTime: action.startTime,
            endTime: action.endTime
          }]
        }
      });
    // 선택된 블록 삭제
    // update를 이용해 리턴하는 것으로 만들기
    case DELETE_BLOCK:
      return Object.assign({}, state, {
        blocks: state.blocks.filter(block => block.id !== state.selectedBlockId).map((block, index) => {
          return Object.assign({}, block, {
            id: index + 1
          });
        }),
        selectedBlockId: null
      });
    // 선택된 블록 초기화
    case CLEAR_BLOCK:
      return update(state, {
        blocks: {
          [state.selectedBlockId - 1]: {
            subtitle: {
              $set: ''
            }
          }
        }
      });
    // 블록 하나 선택
    case SELECT_BLOCK:
      return update(state, {
        selectedBlockId: {
          $set: state.blocks[action.id - 1].id
        }
      });
    // 블록 선택 취소
    case CANCEL_BLOCK:
      return update(state, {
        selectedBlockId: {
          $set: null
        }
      });
    // 선택된 블록 자막 수정
    case UPDATE_BLOCK_TEXT:
      return update(state, {
        blocks: {
          [state.selectedBlockId - 1]: {
            subtitle: {
              $set: action.subtitle
            }
          }
        }
      });
    // 블록 시간 수정
    case UPDATE_BLOCK_TIME:
      return update(state, {
        blocks: {
          [state.selectedBlockId - 1]: {
            startTime: {
              $set: action.startTime
            },
            endTime: {
              $set: action.endTime
            }
          }
        }
      });
    // 자막 파일 블록으로 불러오기
    case LOAD_BLOCK_FILE:
      return update(state, {
        blocks: {
          $set: action.blocks
        }
      });
    // 한 번 이상 저장된 자막 파일로 설정
    case SAVED_BLOCK_FILE:
      return update(state, {
        blockFilePath: {
          $set: action.path
        },
        blockFileSaved: {
          $set: true
        }
      });
    // 저장되지 않은 자막 파일로 설정
    case UNSAVED_BLOCK_FILE:
      return update(state, {
        blockFilePath: {
          $set: null
        },
        blockFileSaved: {
          $set: false
        }
      });

    default:
      return state;
  }
}
