# Electron报错The SUID sandbox helper binary was found, but is not configured correctly.

## 解决方案

> [[Bug]: The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing I&#39;m aborting now. · Issue #42510 · electron/electron · GitHub](https://github.com/electron/electron/issues/42510)

I found why it is failing, and I also found the solution.

[2.3.2 AppImage fails to start due to missing sandboxing #2429  
](https://github.com/arduino/arduino-ide/issues/2429#issuecomment-2099775010)  
As mentioned in the reference documentation, the problem is that Ubuntu 24.04 implemented new restrictions for AppImage apps, which restricts the use of sandboxes.

The solution is to lift the restrictions that Ubuntu 24.04 implements in the AppImages.

```shell
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
```

for deactivate restrictions

```shell
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=1
```

for activate restrictions

**I hope it serves as a temporary solution.**
