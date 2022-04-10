import axios from 'axios';

import { REPORT_SWITCH_REPORT_MODE } from '../constants/reportConstants';

export const switchReportMode = (mode) => ({
  type: REPORT_SWITCH_REPORT_MODE,
  payload: mode,
});
