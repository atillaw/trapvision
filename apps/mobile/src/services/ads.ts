import { InterstitialAd, RewardedAd, AdEventType, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads'
import { shouldShowInterstitial, shouldShowRewarded } from '@/services/api'

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL)
const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED)

let interstitialLoaded = false
let rewardedLoaded = false

interstitial.addAdEventListener(AdEventType.LOADED, () => { interstitialLoaded = true })
interstitial.addAdEventListener(AdEventType.CLOSED, () => { interstitial.load() })
rewarded.addAdEventListener(AdEventType.LOADED, () => { rewardedLoaded = true })
rewarded.addAdEventListener(AdEventType.CLOSED, () => { rewarded.load() })

export function initAds() {
  interstitial.load()
  rewarded.load()
}

export function maybeShowInterstitialAd() {
  if (shouldShowInterstitial() && interstitialLoaded) {
    interstitialLoaded = false
    interstitial.show()
  }
}

export function maybeShowRewardedAd(onReward?: () => void) {
  if (shouldShowRewarded() && rewardedLoaded) {
    rewardedLoaded = false
    const sub = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => { onReward && onReward() })
    rewarded.show()
    setTimeout(() => sub(), 5000)
  }
}
