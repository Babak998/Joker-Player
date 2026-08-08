package com.joker.player

import android.app.Service
import android.content.Intent
import android.graphics.Color
import android.graphics.PixelFormat
import android.os.IBinder
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout

class FloatingService : Service() {
    private lateinit var wm: WindowManager
    private var view: LinearLayout? = null

    override fun onCreate() {
        super.onCreate()
        wm = getSystemService(WINDOW_SERVICE) as WindowManager
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setBackgroundColor(Color.DKGRAY)
            setPadding(8, 4, 8, 4)
        }
        val toggle = Button(this).apply { text = "▶" }
        val back = Button(this).apply { text = "‹" }
        val next = Button(this).apply { text = "›" }
        root.addView(back); root.addView(toggle); root.addView(next)
        toggle.setOnClickListener { root.visibility = if (root.visibility == android.view.View.VISIBLE) android.view.View.GONE else android.view.View.VISIBLE }
        back.setOnClickListener { }
        next.setOnClickListener { }
        val type = if (android.os.Build.VERSION.SDK_INT >= 26) WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY else WindowManager.LayoutParams.TYPE_PHONE
        val p = WindowManager.LayoutParams(WRAP, WRAP, type, WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE, PixelFormat.TRANSLUCENT).apply { gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL; y = 80 }
        wm.addView(root, p); view = root
    }
    override fun onDestroy() { view?.let { wm.removeView(it) }; view = null; super.onDestroy() }
    override fun onBind(intent: Intent?): IBinder? = null
    companion object { private const val WRAP = WindowManager.LayoutParams.WRAP_CONTENT }
}
