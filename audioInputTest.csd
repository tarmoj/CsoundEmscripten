<CsoundSynthesizer>
<CsOptions>
-o dac -+rtmidi=null -+rtaudio=null -d -+msg_color=0 -M0 -m0
</CsOptions>
<CsInstruments>
nchnls = 2
nchnls_i = 1
0dbfs = 1            

instr 1
            
	asig = vco2(0.5, p4)
	kenv = adsr(0.05, 0.05, 0.9, 0.1)
	asig = moogladder(asig, 4000, 0.25) * kenv
              
	out(asig)
endin


</CsInstruments>
<CsScore>
i 1 0 1 110

</CsScore>
</CsoundSynthesizer>
