import AppStore from "@/stores/appStore";

const stores = {
  AppStore: new AppStore()
};

export function useStores() {
  return stores;
}
