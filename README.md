# Get .NET SDK Project Versions

This action gets versions from csproj/vbproj.

[![test](https://github.com/kzrnm/get-net-sdk-project-versions-action/actions/workflows/test.yml/badge.svg)](https://github.com/kzrnm/get-net-sdk-project-versions-action/actions/workflows/test.yml)

## Usage

```yml
      - uses: kzrnm/get-net-sdk-project-versions-action@v2
        id: get-version
        with:
          proj-path: YourProject/YourProject.csproj
      - run: echo "${{steps.get-version.outputs.version}}"
      - run: echo "${{steps.get-version.outputs.version-prefix}}" 
      - run: echo "${{steps.get-version.outputs.version-suffix}}" 
      - run: echo "${{steps.get-version.outputs.package-version}}" 
      - run: echo "${{steps.get-version.outputs.assembly-version}}" 
      - run: echo "${{steps.get-version.outputs.file-version}}" 
      - run: echo "${{steps.get-version.outputs.informational-version}}" 
```

## Input

### `proj-path`

**Required** csproj/vbproj path.

## 出力
### `version`

`<Version>`
### `version-prefix`

`<VersionPrefix>`
### `version-suffix`

`<VersionSuffix>`
### `package-version`

`<PackageVersion>`
### `assembly-version`

`<AssemblyVersion>`
### `file-version`

`<FileVersion>`
### `informational-version`

`<InformationalVersion>`

## Reference

- [Additions to the csproj format for .NET Core - .NET Core CLI | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/tools/csproj)
- [NuGet Package Version Reference | Microsoft Docs](https://docs.microsoft.com/nuget/concepts/package-versioning)
- [csproj のバージョン 管理 について - BEACHSIDE BLOG](https://blog.beachside.dev/entry/2019/06/06/190000) Japanese
