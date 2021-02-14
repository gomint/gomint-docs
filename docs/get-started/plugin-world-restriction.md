---
id: plugin-world-restriction
title: Plugin World Restriction
sidebar_label: Plugin World Restriction
---

GoMint worlds are running mostly independent of each other. Every GoMint world has its own thread.
This allows Gomint to scale better than many other minecraft server softwares and you can build a little "server network" just with one GoMint running many worlds.

To not make plugin development unneccessary complex, we created an API that allows plugins to only run in certain worlds.
You can set up the worlds of a plugin within the `worlds.yml` file you can find in the folder `plugins/ThePluginName`.

While plugins are not forced by the server to follow this setting, it is strongly adviced that every plugin uses the easy provided API to follow the `worlds.yml` setting.
