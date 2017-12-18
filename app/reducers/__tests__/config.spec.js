import config from '../../../appsettings.json';
import { config as REDUCER_KEY } from '../../reducers';
import { getCampaignBuilderLocation } from '../config';

describe('Reducers > Config', () => {

  it('should return the location of the campaign builder', () => {
    expect(getCampaignBuilderLocation({
      [REDUCER_KEY]: config,
    })).toEqual('https://stable.brighter.io/campaigns/new');
  });
});
