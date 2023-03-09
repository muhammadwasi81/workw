export const OUTGOING_CALL_STATUS = {
    NO_STATUS: 0,
    CALLING: 1,
    RINGING: 2,
    BUSY: 3,
    NOT_ANSWER: 4,
    ACCEPTED: 5,
    DECLINED: 6
};

export const OUTGOING_CALL_STATUS_MESSAGE = {
    [OUTGOING_CALL_STATUS.NO_STATUS]: "Calling...",
    [OUTGOING_CALL_STATUS.CALLING]: "Calling...",
    [OUTGOING_CALL_STATUS.RINGING]: "Ringing...",
    [OUTGOING_CALL_STATUS.BUSY]: "Busy on another call...",
    [OUTGOING_CALL_STATUS.NOT_ANSWER]: "Not Answering..."
};