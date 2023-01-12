export class OmdbAPIVersioningTool {
  #versionList = ["v1"];
  #defaultVersion = "v1";

  setVersion = (version = "v1") => {
    version = this.#versionList.includes(version)
      ? version
      : this.#defaultVersion;
    return version;
  };
}
