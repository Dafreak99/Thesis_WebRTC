import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  minimizeLocalStream: boolean;
  localStream: null | MediaStream;
  localCameraEnabled: boolean;
  localMicrophoneEnabled: boolean;
  shareScreenEnabled: boolean;
  recordScreenEnabled: boolean;
  remoteStreams: RemoteStream[];
  connections: any[];
  mySocketId: null | string;
  myUsername: null | string;
  myAvatar: null | string;
  shareScreenStream: null | MediaStream;
  recordStream: null | MediaStream;
}

export interface RemoteStream {
  stream: MediaStream;
  username: string;
  socketId: string;
  trackId: string;
}

const initialState: InitialState = {
  minimizeLocalStream: false,
  localStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  shareScreenEnabled: false,
  recordScreenEnabled: false,
  remoteStreams: [],
  connections: [],
  mySocketId: null,
  myUsername: null,
  myAvatar: null,
  shareScreenStream: null,
  recordStream: null,
};

const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setMinimizeLocalstream: (state: InitialState, action) => {
      state.minimizeLocalStream = action.payload;
    },
    setLocalStream: (state: InitialState, action) => {
      state.localStream = action.payload;
    },
    setLocalCameraEnabled: (state: InitialState, action) => {
      state.localCameraEnabled = action.payload;
    },
    setLocalMicrophoneEnabled: (state: InitialState, action) => {
      state.localMicrophoneEnabled = action.payload;
    },
    setShareScreenEnabled: (state: InitialState, action) => {
      state.shareScreenEnabled = action.payload;
    },
    setRecordScreenEnabled: (state: InitialState, action) => {
      state.recordScreenEnabled = action.payload;
    },
    setRemoteStreams: (state: InitialState, action) => {
      let index = state.remoteStreams.findIndex(
        (stream) => stream.trackId === action.payload.trackId
      );
      if (index !== -1) {
        state.remoteStreams[index] = action.payload;
      } else {
        state.remoteStreams.push(action.payload);
      }
    },

    setConnection: (state: InitialState, action) => {
      state.connections.push(action.payload);
    },
    hostLeave: (state: InitialState, _) => {
      state.connections = [];
      state.remoteStreams = [];
    },
    setSocketId: (state: InitialState, action) => {
      // TODO: Error here (display my user)
      state.mySocketId = action.payload;
    },
    setUsername: (state: InitialState, action) => {
      state.myUsername = action.payload;
    },
    setAvatar: (state: InitialState, action) => {
      state.myAvatar = action.payload;
    },
    setShareScreenStream: (state: InitialState, action) => {
      state.shareScreenStream = action.payload;
    },
    setRecordStream: (state: InitialState, action) => {
      state.recordStream = action.payload;
    },
  },
});

export const {
  setMinimizeLocalstream,
  setLocalStream,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
  setShareScreenEnabled,
  setRecordScreenEnabled,
  setRemoteStreams,
  setConnection,
  hostLeave,
  setSocketId,
  setUsername,
  setAvatar,
  setShareScreenStream,
  setRecordStream,
} = streamSlice.actions;

export default streamSlice.reducer;
